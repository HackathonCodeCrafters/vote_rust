use std::collections::{HashMap, HashSet};
use candid::{CandidType, Principal};
use ic_cdk::{api::time, query, update};
use serde::{Deserialize, Serialize};


use ic_cdk::api;
use sha2::{Digest, Sha256};

fn generate_deterministic_id() -> String {
    let principal = api::caller().to_text();
    let timestamp = api::time().to_string();
    let concat = format!("{}-{}", principal, timestamp);
    let mut hasher = Sha256::new();
    hasher.update(concat.as_bytes());
    let result = hasher.finalize();
    hex::encode(&result[..16]) // ambil 16 byte, hex string
}



#[derive(CandidType, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Votes {
    pub yes: u32,
    pub no: u32,
}


#[derive(CandidType, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
struct Proposal {
    pub id: String,
    pub title: String,
    pub description: String,
    pub image_url: Option<String>,
    pub yes_votes: u32,  
    pub no_votes: u32, 
    pub created_at: u64,
    pub duration_days: u32,
    pub time_left: Option<String>, 
    pub status: Option<String>, 
    pub total_voters: Option<u32>, 
    pub full_description: Option<String>, 
    pub image: Option<String>, 
    pub votes: Option<Votes>, 
    pub author: Option<String>, 
    pub category: Option<String>, 
    pub discussions: Option<u32>, 
    pub voters: Option<HashSet<Principal>>
}


#[derive(Default, CandidType, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
struct State {
    proposals: HashMap<String, Proposal>,
}

thread_local! {
    static STATE: std::cell::RefCell<State> = Default::default();
}


#[ic_cdk::pre_upgrade]
fn pre_upgrade() {
    ic_cdk::println!("pre_upgrade called");
    STATE.with(|state| {
        let state = state.borrow();
        if let Err(e) = ic_cdk::storage::stable_save((state.clone(),)) {
            ic_cdk::println!("Failed to save state: {:?}", e);
        }
    });
}

#[ic_cdk::post_upgrade]
fn post_upgrade() {
    ic_cdk::println!("post_upgrade called");
    STATE.with(|state| {
        let restored: Result<(State,), _> = ic_cdk::storage::stable_restore();
        match restored {
            Ok((old_state,)) => {
                ic_cdk::println!("State restored successfully");
                *state.borrow_mut() = old_state;
            }
            Err(e) => {
                ic_cdk::println!("No previous state found or failed to restore state: {:?}", e);
                *state.borrow_mut() = State::default();
            }
        }
    });
}


#[update]
fn add_proposal(title: String, description: String, image_url: Option<String>, duration_days: u32, full_description : Option<String>, category: Option<String>, image: Option<String>) -> String {
    STATE.with(|state| {
        let mut s = state.borrow_mut();

        let id = generate_deterministic_id();
        let now = time() / 1_000_000_000; 

        let time_left = Some(format!("{} days", duration_days));

        let proposal = Proposal {
            id : id.clone(),
            title,
            description,
            image_url,
            yes_votes: 0,
            no_votes: 0,
            created_at: now,
            duration_days,
            time_left,
            status: None,
            total_voters: None,
            full_description,
            image,
            votes: Some(Votes { yes: 0, no: 0 }),
            author: None,
            category,
            discussions: None,
            voters: Some(HashSet::new()),
        };

        s.proposals.insert(id.clone(), proposal);
        id
    })
}



#[derive(CandidType, Deserialize)]
pub enum VoteChoice {
    Yes,
    No,
}


#[derive(CandidType, Deserialize, Serialize)]
enum VoteResult {
    Ok,
    Err(String),
}

#[update]
fn vote_proposal(id: String, choice: VoteChoice) -> VoteResult {
    let caller = ic_cdk::api::caller();

    STATE.with(|state| {
        let mut s = state.borrow_mut();
        if let Some(proposal) = s.proposals.get_mut(&id) {

            let voters = proposal.voters.get_or_insert(HashSet::new());
            if voters.contains(&caller) {
                return VoteResult::Err("You have already voted.".to_string());
            }


            match choice {
                VoteChoice::Yes => proposal.yes_votes += 1,
                VoteChoice::No => proposal.no_votes += 1,
            }

            if let Some(v) = proposal.votes.as_mut() {
                match choice {
                    VoteChoice::Yes => v.yes += 1,
                    VoteChoice::No => v.no += 1,
                }
            } else {
                proposal.votes = Some(match choice {
                    VoteChoice::Yes => Votes { yes: 1, no: 0 },
                    VoteChoice::No => Votes { yes: 0, no: 1 },
                });
            }

            proposal.total_voters = Some(proposal.total_voters.unwrap_or(0) + 1);


            voters.insert(caller);

            VoteResult::Ok
        } else {
            VoteResult::Err("Proposal not found".to_string())
        }
    })
}





#[query]
fn get_proposals() -> Vec<Proposal> {
    STATE.with(|state| state.borrow().proposals.values().cloned().collect())
}


#[query]
fn get_proposal_by_id(id: String) -> Option<Proposal> {
    STATE.with(|state| state.borrow().proposals.get(&id).cloned())
}

#[derive(CandidType, Serialize)]
struct ProposalStats {
    total_proposals: u64,
    total_yes_votes: u64,
    total_no_votes: u64,
    total_votes: u64,
}


#[query]
fn get_proposal_stats() -> ProposalStats {
    STATE.with(|state| {
        let state = state.borrow();
        let total_proposals = state.proposals.len() as u64;
        let total_yes_votes = state.proposals.values().map(|p| p.yes_votes as u64).sum();
        let total_no_votes = state.proposals.values().map(|p| p.no_votes as u64).sum();
        let total_votes = total_yes_votes + total_no_votes;
        ProposalStats {
            total_proposals,
            total_yes_votes,
            total_no_votes,
            total_votes,
        }
    })
}


#[update]
fn delete_proposal(id: String) -> VoteResult {
    STATE.with(|state| {
        let mut s = state.borrow_mut();
        if s.proposals.remove(&id).is_some() {
            VoteResult::Ok
        } else {
            VoteResult::Err(format!("Proposal with id {} not found", id))
        }
    })
}



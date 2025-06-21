use std::collections::HashMap;
use candid::CandidType;
use ic_cdk::{api::time, query, update};
use serde::{Deserialize, Serialize};



#[derive(Debug, CandidType, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
struct Proposal {
    pub id: u64,
    pub title: String,
    pub description: String,
    pub image_url: Option<String>,
    pub yes_votes: u32,  
    pub no_votes: u32, 
    pub created_at: u64,
    pub duration_days: u32,
}


#[derive(Default)]
struct State {
    proposals: HashMap<u64, Proposal>,
    next_id: u64,
}

thread_local! {
    static STATE: std::cell::RefCell<State> = Default::default();
}


#[update]
fn add_proposal(title: String, description: String, image_url: Option<String>, duration_days: u32) -> u64 {
    STATE.with(|state| {
        let mut s = state.borrow_mut();

        let id = s.next_id;
        s.next_id += 1;

        let now = time() / 1_000_000_000; 
        let proposal = Proposal {
            id,
            title,
            description,
            image_url,
            yes_votes: 0,
            no_votes: 0,
            created_at: now,
            duration_days,
        };

        s.proposals.insert(id, proposal);
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
fn vote_proposal(id: u64, choice: VoteChoice) -> VoteResult {
    STATE.with(|state| {
        let mut s = state.borrow_mut();
        if let Some(proposal) = s.proposals.get_mut(&id) {
            match choice {
                VoteChoice::Yes => proposal.yes_votes += 1,
                VoteChoice::No => proposal.no_votes += 1,
            }
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
fn get_proposal_by_id(id: u64) -> Option<Proposal> {
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


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
    pub votes: u32,
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
fn add_proposal(title: String, description: String, duration_days: u32) -> u64 {
    STATE.with(|state| {
        let mut s = state.borrow_mut();

        let id = s.next_id;
        s.next_id += 1;

        let now = time() / 1_000_000_000; 
        let proposal = Proposal {
            id,
            title,
            description,
            votes: 0,
            created_at: now,
            duration_days,
        };

        s.proposals.insert(id, proposal);
        id
    })
}



#[derive(CandidType, Deserialize)]
enum VoteResult {
    Ok,
    Err(String),
}

#[update]
fn vote_proposal(id: u64) -> VoteResult {
    STATE.with(|state| {
        let mut s = state.borrow_mut();
        if let Some(proposal) = s.proposals.get_mut(&id) {
            proposal.votes += 1;
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

use ic_cdk_macros::*;
use std::collections::HashMap;
use candid::CandidType;
use serde::{Deserialize, Serialize};
use ic_cdk::api::caller;

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
struct Candidate {
    name: String,
    votes: u32,
}

#[derive(Default)]
struct State {
    candidates: HashMap<String, Candidate>,
    voters: Vec<String>,
}

thread_local! {
    static STATE: std::cell::RefCell<State> = Default::default();
}

#[update]
fn vote(name: String, voter_id: String) -> String {
    STATE.with(|state| {
        let mut s = state.borrow_mut();

        if s.voters.contains(&voter_id) {
            return "Sudah voting!".to_string();
        }

        match s.candidates.get_mut(&name) {
            Some(candidate) => {
                candidate.votes += 1;
                s.voters.push(voter_id);
                "Vote berhasil!".to_string()
            },
            None => "Kandidat tidak ditemukan.".to_string()
        }
    })
}


#[query]
fn get_results() -> Vec<Candidate> {
    STATE.with(|state| {
        state.borrow().candidates.values().cloned().collect()
    })
}

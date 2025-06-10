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
fn add_candidate(name: String) {
    STATE.with(|state| {
        let mut s = state.borrow_mut();
        s.candidates.insert(name.clone(), Candidate { name, votes: 0 });
    });
}

#[update]
fn vote(name: String) -> String {
    let voter = caller().to_string();
    println!("📥 Vote diterima dari: {}", voter);

    STATE.with(|state| {
        let mut s = state.borrow_mut();
        println!("📊 Kandidat sekarang: {:?}", s.candidates);

        if s.voters.contains(&voter) {
            println!("⚠️ Pemilih {} sudah voting", voter);
            return "Sudah voting!".to_string();
        }

        match s.candidates.get_mut(&name) {
            Some(candidate) => {
                candidate.votes += 1;
                s.voters.push(voter);
                println!("✅ Vote untuk {} berhasil", name);
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

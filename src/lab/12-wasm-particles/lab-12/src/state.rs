use rand::prelude::*;
use std::f64::consts::PI;

pub struct Vec2 {
    pub x: f64,
    pub y: f64,
}

impl Vec2 {
    pub fn new(x: f64, y: f64) -> Vec2 {
        Vec2 { x: x, y: y }
    }
}

pub struct Particle {
    pub curr_pos: Vec2,
    pub prev_pos: Vec2,
}

impl Particle {
    pub fn new(cx: f64, cy: f64, px: f64, py: f64) -> Particle {
        Particle {
            curr_pos: Vec2::new(cx, cy),
            prev_pos: Vec2::new(px, py),
        }
    }

    pub fn update(&mut self) {
        let prev_vel = Vec2::new(
            self.curr_pos.x - self.prev_pos.x,
            self.curr_pos.y - self.prev_pos.y,
        );

        let next_vel = Vec2::new(prev_vel.x, prev_vel.y + 0.15); // gravity
        let next_vel = Vec2::new(next_vel.x * 0.99, next_vel.y * 0.995); // drag

        self.prev_pos = Vec2::new(self.curr_pos.x, self.curr_pos.y);
        self.curr_pos = Vec2::new(self.curr_pos.x + next_vel.x, self.curr_pos.y + next_vel.y);

        if self.curr_pos.y > 2_000.0 {
            let a = PI * 2.0 * random::<f64>();
            let r = 20.0 * random::<f64>();
            let px = a.cos() * r;
            let py = a.sin() * r;

            self.prev_pos = Vec2::new(px, py);
            self.curr_pos = Vec2::new(0.0, 0.0);
        }
    }
}

pub struct State {
    pub t: f64,
    pub p: Vec<Particle>,
}

impl State {
    pub fn new() -> State {
        State {
            t: 0.0,
            p: Vec::new(),
        }
    }

    pub fn update(&mut self, t: f64) {
        self.t = t;

        if self.p.len() < 10_000 {
            for _ in 0..10 {
                let a = PI * 2.0 * random::<f64>();
                let r = 20.0 * random::<f64>();
                let px = a.cos() * r;
                let py = a.sin() * r;
                self.p.push(Particle::new(0.0, 0.0, px, py));
            }
        }

        for p in self.p.iter_mut() {
            p.update();
        }
    }
}

import * as THREE from 'three';
import type { SectionId } from '../../types';

export interface DestinationGate {
  id: SectionId;
  title: string;
  z: number;
  color: string;
  icon: string;
}

export const GATES: DestinationGate[] = [
  { id: 'about', title: 'ABOUT ME', z: -25, color: '#00f2fe', icon: 'User' },
  { id: 'projects', title: 'PROJECTS', z: -80, color: '#00f2fe', icon: 'Code2' },
  { id: 'experience', title: 'EXPERIENCE', z: -140, color: '#d946ef', icon: 'Briefcase' },
  { id: 'skills', title: 'SKILLS', z: -200, color: '#00f2fe', icon: 'Settings' },
  { id: 'education', title: 'EDUCATION', z: -260, color: '#ff007f', icon: 'GraduationCap' },
  { id: 'contact', title: 'CONTACT', z: -320, color: '#00ff88', icon: 'Send' },
];

export class CarState {
  // Car position & orientation in 3D world
  public position: THREE.Vector3 = new THREE.Vector3(0, 0, 10);
  public rotation: number = 0; // heading angle in radians (0 is facing -Z down highway)
  public speed: number = 0; // units/sec
  public displaySpeed: number = 0; // km/h (0 to ~160)
  public steering: number = 0; // current wheel turn angle
  public isBraking: boolean = false;
  
  // Destination trigger state
  public nearbyGate: DestinationGate | null = null;
  public targetGateZ: number | null = null; // when autopilot / jump is called

  // Input state
  public keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    brake: false,
  };

  // Subscribed listeners for HUD updates
  private listeners: Set<() => void> = new Set();

  public subscribe(cb: () => void) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  public notify() {
    this.listeners.forEach((cb) => cb());
  }

  // Teleport or drive smoothly to a destination
  public driveTo(id: SectionId) {
    const gate = GATES.find((g) => g.id === id);
    if (gate) {
      this.targetGateZ = gate.z + 8; // Stop right before the gate
      this.notify();
    }
  }
}

// Global Singleton Car State
export const carState = new CarState();

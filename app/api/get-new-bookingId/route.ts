import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { readFileSync, writeFileSync } from "fs";

const COUNTER_FILE = path.join(process.cwd(), "data", "booking_counter.json");
const COMPANY_PREFIX = process.env.COMPANY_PREFIX || "MDS";

// Initialize counter file if it doesn't exist
async function initializeCounterFile() {
  try {
    await fs.access(COUNTER_FILE);
  } catch {
    await fs.mkdir(path.dirname(COUNTER_FILE), { recursive: true });
    await fs.writeFile(COUNTER_FILE, JSON.stringify({ lastSequence: 0 }));
  }
}

// Read counter synchronously for atomic operations
function readCounter() {
  try {
    const data = readFileSync(COUNTER_FILE, "utf8");
    return JSON.parse(data).lastSequence;
  } catch {
    return 0; // Fallback to 0 if file is corrupted or missing
  }
}

// Write counter synchronously
function writeCounter(sequence: number) {
  writeFileSync(COUNTER_FILE, JSON.stringify({ lastSequence: sequence }));
}

export async function GET() {
  await initializeCounterFile();

  // Synchronize access to prevent race conditions
  let sequence;
  try {
    // Read current sequence
    sequence = readCounter();

    // Increment sequence
    sequence += 1;

    // Write back synchronously
    writeCounter(sequence);

    // Format booking ID (e.g., MDS000001)
    const bookingId = `${COMPANY_PREFIX}${sequence.toString().padStart(6, "0")}`;

    return NextResponse.json({ bookingId }, { status: 200 });
  } catch (error) {
    console.error("Error generating booking ID:", error);
    return NextResponse.json(
      { error: "Failed to generate booking ID" },
      { status: 500 }
    );
  }
}
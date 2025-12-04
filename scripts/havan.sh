#!/bin/bash

STATE_FILE="$(dirname "$0")/../HAVAN_STATE"

# Initialize state file if it doesn't exist
if [ ! -f "$STATE_FILE" ]; then
  echo "0" > "$STATE_FILE"
fi

# Read current state
CURRENT=$(cat "$STATE_FILE")

# Flip the state
if [ "$CURRENT" = "0" ]; then
  echo "1" > "$STATE_FILE"
  echo "Havan started"
else
  echo "0" > "$STATE_FILE"
  echo "Havan stopped"
fi

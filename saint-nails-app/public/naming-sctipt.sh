#!/bin/bash

i=0  # Start counting from 0
for img in *; do
    # Check if the file is an image (adjust pattern as necessary)
    if [[ $img =~ \.(jpg|jpeg|png|gif)$ ]]; then
        # Ensure the target filename does not already exist
        while [[ -e "img-$i.${img##*.}" ]]; do
            ((i++))  # Increment counter to avoid conflict
        done
        mv "$img" "img-$i.${img##*.}"  # Rename and keep the file extension
        ((i++))  # Increment counter for the next file
    fi
done

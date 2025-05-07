#!/bin/bash

# Create thumbnails directory if it doesn't exist
mkdir -p resources/media/thumbnails

# Function to generate thumbnail
generate_thumbnail() {
    local input=$1
    local output=$2
    ffmpeg -i "$input" -ss 00:00:01 -frames:v 1 "$output" -y
}

# Generate thumbnails for each video
generate_thumbnail "resources/media/videos/rainStar-mobile.webm" "resources/media/thumbnails/rainStar-mobile.jpg"
generate_thumbnail "resources/media/videos/rainStarFar-mobile.webm" "resources/media/thumbnails/rainStarFar-mobile.jpg"
generate_thumbnail "resources/media/videos/self-building-tent-mobile.webm" "resources/media/thumbnails/self-building-tent-mobile.jpg"
generate_thumbnail "resources/media/final/gear_shelf-mobile.webm" "resources/media/thumbnails/gear_shelf-mobile.jpg"
generate_thumbnail "resources/media/final/phonePocket-mobile.webm" "resources/media/thumbnails/phonePocket-mobile.jpg"
generate_thumbnail "resources/media/final/back_pockets-mobile.webm" "resources/media/thumbnails/back_pockets-mobile.jpg"
generate_thumbnail "resources/media/final/long_pockets-mobile.webm" "resources/media/thumbnails/long_pockets-mobile.jpg"

echo "Thumbnails generated successfully!" 
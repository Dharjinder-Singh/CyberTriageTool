#!/bin/bash

DISK_IMAGE=$1
OUTPUT_DIR=$2
OFFSET=$3

if [ -z "$DISK_IMAGE" ] || [ -z "$OUTPUT_DIR" ]; then
    echo "Usage: $0 <disk_image> <output_dir>"
    exit 1
fi

mkdir -p "$OUTPUT_DIR"


# Partition Analysis
echo "[*] Analyzing partitions..."
mmls $DISK_IMAGE > "$OUTPUT_DIR/partition_table.txt"

# File System Information
echo "[*] Extracting file system information..."
fsstat -o $OFFSET $DISK_IMAGE > "$OUTPUT_DIR/filesystem_info.txt"

# File and Directory Tree
echo "[*] Extracting file and directory tree..."
fls -o $OFFSET -r $DISK_IMAGE > "$OUTPUT_DIR/file_tree.txt"

# Timeline Analysis
echo "[*] Generating timeline..."
# fls -o $OFFSET -m $DISK_IMAGE > "$OUTPUT_DIR/bodyfile.txt"
fls -m / -o $OFFSET -r $DISK_IMAGE > "$OUTPUT_DIR/bodyfile.txt"
# mactime -d -b "$OUTPUT_DIR/bodyfile.txt" > "$OUTPUT_DIR/timeline.csv"

tsk_recover -o $OFFSET $DISK_IMAGE "extracted_files/"

# echo "[*] Creating raw image" 
# # Replace "input.E01" and "output.raw" with appropriate paths.
# dd if=$DISK_IMAGE of=output.img skip=$OFFSET

# Recover Deleted Files
echo "[*] Recovering deleted files..."
# tsk_recover -e -o $DISK_IMAGE "$OUTPUT_DIR/recovered_files/"


echo "[*] Analysis complete. Output stored in $OUTPUT_DIR."

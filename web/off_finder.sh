#!/bin/bash

DISK_IMAGE=$1
partition_keyword="NTFS"
mmls $DISK_IMAGE > part.txt
partition_info=$(mmls "$DISK_IMAGE" | grep -i "$partition_keyword")
start_sector=$(echo "$partition_info" | awk '{print $3}')
echo $start_sector > offset.txt
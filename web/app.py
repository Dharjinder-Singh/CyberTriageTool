import subprocess

command = "bash imp.sh nps-2009-domexusers.E01 outputfi 63"  # Replace with your desired command

result = subprocess.run(command, shell=True, capture_output=True, text=True)

if result.returncode == 0:
    print(result.stdout)
else:
    print(result.stderr)
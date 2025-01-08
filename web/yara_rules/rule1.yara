rule DetectWindowsExecutables {
    strings:
        $mz = { 4D 5A } // MZ header
    condition:
        $mz at 0
}
rule DetectSuspiciousPatterns {
    strings:
        $exe = { 4D 5A } // Executable files
        $bat = ".bat"
        $scr = ".scr"
    condition:
        any of them
}

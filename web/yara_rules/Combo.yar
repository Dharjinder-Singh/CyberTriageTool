rule domain {
    meta:
        author = "Antonio S. <asanchez@plutec.net>"
    strings:
        $domain_regex = /([\w\.-]+)/ wide ascii
    condition:
        $domain_regex
}
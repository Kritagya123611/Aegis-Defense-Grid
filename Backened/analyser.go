package main

import "regexp"

func AnalyzeTraffic(payload string) bool {
	sqlInjectionRegex := regexp.MustCompile(
		`(?i)(union\s+select|' OR '1'='1|--;)`,
	)
	return sqlInjectionRegex.MatchString(payload)
}

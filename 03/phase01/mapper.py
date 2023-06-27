#!/usr/bin/python3

import sys
import csv


def print_formatted(message, likes, retweet_count, web_app_source, iphone_source, android_source):
    print("{}\t{},{},{},{},{}".format(message, likes, retweet_count, web_app_source, iphone_source, android_source))


def main():
    reader = csv.reader(sys.stdin)
    for row in reader:
        tweet = row[2].lower()
        likes = row[3]
        retweet_count = row[4]
        source = row[5].lower()

        message = ''

        if "biden" in tweet and "trump" in tweet:
            message = "Both Candidate"
        elif "biden" in tweet:
            message = "Joe Biden"
        elif "trump" in tweet:
            message = "Donald Trump"

        if message:
            print_formatted(message, likes, retweet_count, "web app" in source, "iphone" in source, "android" in source)


main()

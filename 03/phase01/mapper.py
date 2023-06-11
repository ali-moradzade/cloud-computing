import sys
import csv

def print_formatted(message, likes, retweets, web_app_source, iphone_source, android_source):
        print(f"{message}\t{likes},{retweets},{web_app_source},{iphone_source},{android_source}")

reader = csv.reader(sys.stdin)

for i,row in enumerate(reader):
    if i >= 9:
        break

    tweet=row[2].lower()
    likes=row[3]
    retweet_count=row[4]
    source=row[5].lower()

    message=''

    if "biden" in tweet and "trump" in tweet:
        message = "Both Candidate"
    elif "biden" in tweet:
        message = "Joe Biden"
    elif "trump" in tweet:
        message = "Donald Trump"

    if message != '':
        print_formatted(message, likes, retweet_count, web_app_source=int("web app" in source),
            iphone_source=int("iphone" in source), android_source=int("android" in source),
        )


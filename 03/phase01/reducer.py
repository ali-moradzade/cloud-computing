import sys

def print_formatted(current_candidate, likes, retweets, web_app_source, iphone_source, android_source):
    print(f'{current_candidate}\t{likes}\t{retweets}\t{web_app_source}\t{iphone_source}\t{android_source}')


likes = 0
retweets = 0
web_app_source = 0
iphone_source = 0
android_source = 0

current_candidate = None
candidate = None

for line in sys.stdin:
    line = line.strip()
    candidate, tweet_stats_str = line.split('\t', 1)
    tweet_stats = tweet_stats_str.split(',')

    tweet_stats = [int(float(stat)) for stat in tweet_stats]

    like=tweet_stats[0]
    retweet=tweet_stats[1]
    web_app_source=tweet_stats[2]
    iphone_source=tweet_stats[3]
    android_source=tweet_stats[4]

    if current_candidate == candidate:
        likes += like
        retweets += retweet
        web_app_source += web_app_source
        iphone_source += iphone_source
        android_source += android_source
    else:
        if current_candidate:
            print_formatted(current_candidate, likes, retweets, web_app_source, iphone_source, android_source)

        likes += tweet_stats.like
        retweets += tweet_stats.retweet
        web_app_source += tweet_stats.web_app_source
        iphone_source += tweet_stats.iphone_source
        android_source += tweet_stats.android_source
        current_candidate = candidate
  
if current_candidate == candidate:
        print_formatted(current_candidate, likes, retweets, web_app_source, iphone_source, android_source)

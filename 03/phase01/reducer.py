import sys


def print_formatted(candidate, like, retweet, web_app_source, iphone_source, android_source):
    print(
        f'{candidate}\t{like}\t{retweet}\t{web_app_source}\t{iphone_source}\t{android_source}'
    )


def main():
    total_likes = 0
    total_retweets = 0
    total_web_app_source = 0
    total_iphone_source = 0
    total_android_source = 0

    current_candidate = None
    candidate = None

    for line in sys.stdin:
        line = line.strip()
        candidate, tweet_stats_str = line.split('\t', 1)
        tweet_stats = tweet_stats_str.split(',')

        like = int(tweet_stats[0])
        retweet = int(tweet_stats[1])
        web_app_source = int(tweet_stats[2])
        iphone_source = int(tweet_stats[3])
        android_source = int(tweet_stats[4])

        if current_candidate == candidate:
            total_likes += like
            total_retweets += retweet
            total_web_app_source += web_app_source
            total_iphone_source += iphone_source
            total_android_source += android_source
        else:
            if current_candidate:
                print_formatted(current_candidate, total_likes, total_retweets, total_web_app_source,
                                total_iphone_source, total_android_source)

            total_likes += like
            total_retweets += retweet
            total_web_app_source += web_app_source
            total_iphone_source += iphone_source
            total_android_source += android_source
            current_candidate = candidate

    if current_candidate == candidate:
        print_formatted(current_candidate, total_likes, total_retweets, total_web_app_source,
                        total_iphone_source, total_android_source)


main()

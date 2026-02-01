# Collect data 3x sehari
0 8 * * * node /home/cron_huawei/cron_collect.js >> /home/cron/collect.log 2>&1
0 12 * * * node /home/cron_huawei/cron_collect.js >> /home/cron/collect.log 2>&1
0 15 * * * node /home/cron_huawei/cron_collect.js >> /home/cron/collect.log 2>&1

# Cleansing tiap malam jam 00:00
0 0 * * * node /home/cron_huawei/cron_clean.js >> /home/cron/clean.log 2>&1
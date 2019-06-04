#!/bin/sh

instance_host='[\"verify.dhis2.org\"]'
instance_name="dev_smoke"
instance_action="reset_war"
credentials=$AWX_BOT_CREDENTIALS
aws_url="https://awx.dhis2.org/api/v2"

job_trigger_response=$(curl -v -u $credentials \
  -d '{\"extra_vars\":{\"instance_host\":'$instance_host',\"instance_name\": \"'$instance_name'\",\"instance_action\": \"'$instance_action'\"}}' \
  -H "Content-Type: application/json" \
  -s https://awx.dhis2.org/api/v2/job_templates/10/launch/ | python -m json.tool)

job_id=$(echo $job_trigger_response | python -c 'import sys, json; print json.load(sys.stdin)["job"]')


status="not_started"

while [ "$status" != "successful" ]
do 
    echo $status
    sleep 10 
    job_response=$(curl -v -u $credentials \
       -X GET \
       -s https://awx.dhis2.org/api/v2/jobs/$job_id/ | python -m json.tool) 
       
    status=$(echo $job_response | python -c 'import sys, json; print json.load(sys.stdin)["status"]')

done



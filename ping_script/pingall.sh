#script to ping multiple websites
#add websites you want to ping to the websites.txt file
#the output will be saved into results.txt

websitesFile=websites.txt
websiteList=$(cat  $websitesFile |tr "\n" " ")
websites=($websiteList)
timeOut=1
outputFile=results.txt

	for i in "${websites[@]}"
	do
		echo $i >> $outputFile
		ping -o -t $timeOut $i >> $outputFile
		echo " " >> $outputFile
	done

exit 0
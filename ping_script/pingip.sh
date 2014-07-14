#script to ping multiple websites
#add websites you want to ping to the websites.txt file
#the output will be saved into results.txt

websitesFile=websites.txt
websiteList=$(cat  $websitesFile |tr "\n" " ")
websites=($websiteList)
timeOut=1
outputFile=results.txt


#echo "websites:"
#printf "%s\n" "${websites[@]}"

	for i in "${websites[@]}"
	do
		echo $i >> $outputFile
		ping -o -t $timeOut $i | awk -F'[()]' '/PING/{print $2}' >> $outputFile
		echo " " >> $outputFile
	done

exit 0
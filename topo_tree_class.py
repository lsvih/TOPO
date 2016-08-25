# -*- coding:utf-8 -*-

#####################################################
#   Written By lsvih                                #
#   2016-08-25                                      #
#   Write file-struct of "img" folder to topo.json  #
#####################################################

import os

def getfilelist(filepath):
    count = 0
    typeArray = '['
    filelist = os.listdir(filepath)
    for num in range(len(filelist)):
        if os.path.isdir(filepath + filelist[num]):
            classname = filelist[num]
            typefiles = os.listdir(filepath + classname)
            for classnum in range(len(typefiles)):
                if typefiles[classnum].split(".")[1] == "png":
                    typeArray += '{"id":' + str(count) + ',"class":"' + classname + '","name":"' + typefiles[classnum].split(".")[0] + '"},'
                    count += 1
    return typeArray + ']'



filelist = os.listdir("img/")
o = open("topo.json", "w+")
o.writelines(getfilelist("img/"))
o.close()
print "Success!Please check topo.json"


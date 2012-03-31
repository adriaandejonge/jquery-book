import os
path="/Users/adriaandejonge/Documents/projects/jquery-book/source"  # insert the path to the directory of interest
#here
npath="/Users/adriaandejonge/Documents/projects/jquery-book/source/num"

def numbers(entry, fname):
    infile=open(path+entry+'/'+fname, 'r')
    lines=infile.readlines()
    infile.close()
    outtext = ['%02d %s' % (i, line) for i, line in enumerate(lines)]
    outfile = open(npath+entry+'/'+fname,"w")
    outfile.writelines(str("".join(outtext)))
    outfile.close()
    print fname

def filelist(entry):
    dirList=os.listdir(path + entry)
    for fname in dirList:
        if os.path.isdir(path + entry + '/' + fname) == True:
            print 'is a dir'
        else:
            numbers(entry, fname)

#filelist("/ch1")
#filelist("/ch2")
#filelist("/ch3")
#filelist("/ch4")
#filelist("/ch5")
#filelist("/ch6")
#filelist("/ch7")
filelist("/ch8")
filelist("/ch9")
  
function KillThatProcess([string] $process){



    $response = Read-Host("There are "+ (Get-Process $process).count + " intances of " + $process + ". Would you like to delete all instances? (Y/N)")   
    $response = $response.ToUpper()
    
     if($response -eq "Y" -or $response -eq "YES")
     {
     Get-Process $process | Stop-Process 
     Write-Host("Deleted") -ForegroundColor green  -BackgroundColor blue
     }
     elseif($response -eq "N" -or $response -eq "NO" )
     {
     Write-Host("Not Deleted") -ForegroundColor green  -BackgroundColor blue
     }
     else
     {
     Write-Host("Inproper input") -ForegroundColor green  -BackgroundColor blue
     }
     pause
}

function Bamboozle(){
   Param([string] $filePath = ".") 

   $rand = 65..90 | Get-Random
   $rand = [char]$rand

   $filePath = $filePath+""

   Write-Host("The Lucky letter is $rand") -ForegroundColor green  -BackgroundColor blue

   Get-ChildItem -Path "$filePath*[$Rand]*" -Recurse -Force -File | Remove-Item -WhatIf 

}

Bamboozle

#KillThatProcess("Notepad")

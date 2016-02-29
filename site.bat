@echo off
:: -------------------------------------
:: Using WinSCP to publish from Windows
:: -------------------------------------
if x%1==x goto :oops
for /f "tokens=1,2 delims==" %%i in (%USERPROFILE%\.jekyll\arkadianriver.com.defaults) do @set %%i=%%j

if x%1==xdev goto serve
if x%1==xprod goto prod
if x%1==xpreview goto preview
if x%1==xpublish goto write
echo Nothing to do.
:oops
echo usage: %~nx0 [dev^|prod^|preview^|publish]
goto :eof

:serve
set JEKYLL_ENV=development
call jekyll serve --watch --drafts --future
goto :done

:prod
set JEKYLL_ENV=production
call jekyll build
goto :done

:preview
set JEKYLL_ENV=production
call jekyll serve
goto :done

:publish
%JKL_WINSCPPATH%\winscp.com /script=wscp.tmp
del wscp.tmp
goto :done

:write
 >wscp.tmp echo open %JKL_REMOTEUSER%^@%JKL_REMOTEHOST%
>>wscp.tmp echo synchronize remote %JKL_LOCALSITEPATH% %JKL_REMOTESITEPATH% -delete -filemask="|%JKL_REMOTEEXCLUDES% site.bat"
>>wscp.tmp echo exit
goto publish

:done
echo Done.

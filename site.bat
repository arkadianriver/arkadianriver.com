@echo off
:: -------------------------------------
:: Shortcuts to develop, preview, and publish a site
:: - Using WinSCP to publish from Windows
::
:: Example for the _site.env file:
:: JKL_MYCONFIGS=--config _config.yml,_my/config.yml
:: JKL_WINSCPPATH=C:\PROGRA~1\WinSCP
:: JKL_LOCALSITEPATH=C:\Users\username\_git\myrepo\_site
:: JKL_REMOTESITEPATH=/home/username/public_html
:: JKL_REMOTEHOST=finesite.example.com
:: JKL_REMOTEUSER=myremoteuser
:: JKL_REMOTEEXCLUDES=admin/; anotherapp/; myimportantremotefile.html;
::
:: **This last one and the remote site path are IMPORTANT**
::   This uses 'synchronize', which deletes remote files that are not on
::   your local site. Be _sure_ to list remote stuff you want to preserve
::   in JKL_REMOTEEXCLUDES. See https://winscp.net/eng/docs/file_mask
::   And be sure your remote path is to the web site directory only.
::   You've been warned. I'm not responsible for loss of data. :-P
:: -------------------------------------
if x%1==x goto :oops
for /f "tokens=1,2 delims==" %%i in (_site.env) do @set %%i=%%j

if x%1==xdev goto serve
if x%1==xdevnof goto nofuture
if x%1==xprod goto prod
if x%1==xpreview goto preview
if x%1==xpublish goto write
echo Nothing to do.
:oops
echo usage: %~nx0 [dev^|devnof^|prod^|preview^|publish]
goto :eof

:serve
set JEKYLL_ENV=development
call bundle exec jekyll serve %JKL_MYCONFIGS% --watch --drafts --future
goto :done

:nofuture
set JEKYLL_ENV=development
call bundle exec jekyll serve %JKL_MYCONFIGS% --watch --drafts
goto :done

:prod
set JEKYLL_ENV=production
call bundle exec jekyll build %JKL_MYCONFIGS%
goto :done

:preview
set JEKYLL_ENV=production
call bundle exec jekyll serve %JKL_MYCONFIGS%
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

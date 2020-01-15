FROM httpd:2.4

ENV PATH $PATH:/project/sawtooth-simple-supply/bin

RUN echo "\
\n\
ServerName curator_app\n\
AddDefaultCharset utf-8\n\
LoadModule proxy_module modules/mod_proxy.so\n\
LoadModule proxy_http_module modules/mod_proxy_http.so\n\
ProxyPass /api http://simple-supply-rest-api:8000\n\
ProxyPassReverse /api http://simple-supply-rest-api:8000\n\
\n\
" >>/usr/local/apache2/conf/httpd.conf

EXPOSE 80/tcp

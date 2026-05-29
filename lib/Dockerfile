FROM quay.io/souravkl11/rgnk-v2:latest

RUN git clone https://github.com/SKL-86/SKL-86 /root/Afiya-MD

WORKDIR /root/Afiya-MD

ENV TZ=Asia/Kolkata

RUN yarn install --network-concurrency 1

CMD ["node", "index.js"]

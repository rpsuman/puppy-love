FROM golang:alpine as builder

RUN apk --no-cache add openssl wget git
#ENV GOPATH=/go
ENV GOPATH=$HOME/go
ENV PATH=$PATH:$GOROOT/bin:$GOPATH/bin
#RUN go mod init github.com/golang/dep
#RUN curl https://raw.githubusercontent.com/golang/dep/master/install.sh | sh
#RUN go install github.com/golang/dep/cmd/dep@latest
#RUN git clone https://github.com/golang/dep.git
#RUN cd dep
#RUN ./install.sh

# copies the Gopkg.toml and Gopkg.lock to WORKDIR
RUN mkdir -p /go/src/github.com/pclubiitk/puppy-love/service/signup
WORKDIR /go/src/github.com/pclubiitk/puppy-love/service/signup
COPY Gopkg.toml Gopkg.lock ./

#RUN dep ensure -v -vendor-only

COPY . .
RUN go mod init
RUN go mod tidy
RUN go build

FROM alpine
RUN mkdir -p /go/bin
COPY --from=builder /go/src/github.com/pclubiitk/puppy-love/service/signup/signup /go/bin

RUN apk --no-cache add ca-certificates
EXPOSE 3001
ENTRYPOINT ["/go/bin/signup"]

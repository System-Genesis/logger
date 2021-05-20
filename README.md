## Genesis Logger service

### Setup:

1. npm install
2. create .env  with .env.dev as example
3. configure logstash.conf in logstash folder
4. setup elasticsearch, kibana, rabbitmq
2. npm test if you wish
3. npm run dev

### Dockerized setup ( recommended )
1. configure docker-compose.yml if you wish so
2. docker-compose up -d


## How to use?

send to the same rabbitmq service which this service connected, to queue "logger" an object with this required fields:
```
    level: string;
    message: string;
    system: string;
    service: string;
```
And you can pass any other property you wish to extraFields object.

example:
```
    {level: 'info', message: 'writing user', system: 'kartoffel', service: 'write', extraFields: {user: 'haha@haha.com'}}
```


Now access localhost:5601 to view kibana, from here it depends what you configured in kibana, but in general you
can go to discover tab, add "logstash*" and you will see all the logs, and will be able to filter them as you wish.


# Console scheduler
## Usage
create .env in the project root with your variables (example is in .env.example)
install packages:
```bash
npm i
```
Run project:
```bash
npm run start
```
or with pm2 
```bash
npm run start:pm2
```
## Curl example:
```bash
curl --location 'http://localhost:3000/echoAtTime' \
--header 'Content-Type: application/json' \
--data '{
    "time": 1699019172171,
    "message": "hello!"
}'
```
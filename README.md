# Console scheduler
## Usage
create .env in the project root with your variables (example is in .env.example)
install packages:
```bash
npm i
```
Run project:
```bash
npm run run start
```
or for server reloads on files change:

```bash
npm run run start:dev
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
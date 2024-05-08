# Use a imagem Node.js como base
FROM node:latest

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia os arquivos do projeto para o diretório de trabalho
COPY package*.json ./
COPY . .

# Instala as dependências
RUN npm i

# Expõe a porta na qual a API estará escutando
EXPOSE 3333

# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD ["npm", "run", "dev"]
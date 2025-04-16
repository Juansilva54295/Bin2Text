FROM openjdk:17-slim

WORKDIR /app

# Copia o conteúdo da pasta Backend mantendo a estrutura
COPY Backend/ ./Backend/

# Compila a classe principal
RUN javac Backend/BinaryDecoderServer.java

# Executa a classe com o package correto
CMD ["java", "Backend.BinaryDecoderServer"]

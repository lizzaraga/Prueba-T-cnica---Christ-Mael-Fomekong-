FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["roulette-casino-api/roulette-casino-api.csproj", "roulette-casino-api/"]
RUN dotnet restore "roulette-casino-api/roulette-casino-api.csproj"
COPY . .
WORKDIR "/src/roulette-casino-api"
RUN dotnet build "roulette-casino-api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "roulette-casino-api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "roulette-casino-api.dll"]

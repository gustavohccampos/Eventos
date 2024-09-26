using Eventos.Application;
using Eventos.Application.Interfaces;
using Eventos.Persistence;
using Eventos.Persistence.Data;
using Eventos.Persistence.Interfaces;
using Eventos.Persistence.Repository;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<EventosDbContext>(options =>
    options.UseSqlServer(connectionString));


builder.Services.AddControllers()
            .AddNewtonsoftJson(
                x=>x.SerializerSettings.ReferenceLoopHandling =
                Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IEventoService, EventoService>();
builder.Services.AddScoped<IGeralPersistence, GeralPersistence>();
builder.Services.AddScoped<IEventoPersistence, EventoPersistence>();

builder.Services.AddCors();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x.AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

create table clientes(
	id serial not null,
	rut varchar (15) unique not null,
	nombre varchar(30) not null,
	correo varchar(30) not null,
	primary key (id)
)

insert into clientes (rut, nombre, correo) values ('1-9', 'Osman Perez', 'mail@mail.com');
insert into clientes (rut, nombre, correo) values ('1-8', 'Pedro Pablo Belmar', 'mail@hotmail.com.com');
insert into clientes (rut, nombre, correo) values ('1-7', 'Mauricio Matus', 'mail@gmail.com');
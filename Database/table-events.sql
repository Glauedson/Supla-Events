create table events (
	id serial primary key,
	title varchar not null,
	date_start timestamp not null,
	date_end timestamp not null,
	description varchar,
	image_url varchar,
	price DECIMAL(10,2) DEFAULT 0.00,
	is_paid BOOLEAN DEFAULT false;
)

insert into events(title, date_start, date_end, description, image_url) 
	values('Compliance & Tecnologias Digitais', 
	'2025-03-08 08:00:00', 
	'2025-03-08 22:00:00', 
	'Evento presencial em Centro de Inovação e Tecnologia- CIT, Barueri -SP',
	'https://images.sympla.com.br/66782d4590a52-xs.jpg');

insert into events(title, date_start, date_end, description, image_url)
	values('Symplifique Google: Tecnologia & Eventos', 
	'2025-04-08 08:00:00', 
	'2025-09-08 22:00:00', 
	'Evento presencial em Alterdata Matriz, Teresópolis - RJ',
	'https://images.sympla.com.br/64bffb349a0e7-xs.jpg');

insert into events(title, date_start, date_end, description, image_url)
	values('Show Campo - Vitrine Tecnológica', 
	'2025-04-13 08:00:00', 
	'2025-07-13 22:00:00', 
	'Evento presencial em Paraí, Paraí - RS',
	'https://images.sympla.com.br/678ab777d0b5c-xs.png');

insert into events(title, date_start, date_end, description, image_url)
	values('Inovação e Pessoas: O futuro do RH na tecnologia', 
	'2025-05-12 08:00:00', 
	'2025-08-12 22:00:00', 
	'Evento presencial em Parque Tecnológico de Belo Horizonte BH-TEC, Belo Horizonte - MG',
	'https://images.sympla.com.br/67b330d90719d-xs.jpg');

insert into events(title, date_start, date_end, description, image_url)
	values('Imersão Tecnológica - Asgard', 
	'2025-06-12 08:00:00', 
	'2025-07-12 22:00:00', 
	'Evento Online via Google Meet',
	'https://images.sympla.com.br/6799194cad2ca-xs.png');

insert into events(title, date_start, date_end, description, image_url) 
	values('Kanban System Design (KSD) - Treinamento Oficial', 
	'2025-06-24 08:00:00', 
	'2025-07-24 08:00:00', 
	'Evento Online via Zoom',
	'https://images.sympla.com.br/6752eaafabc26-xs.png');

insert into events(title, date_start, date_end, description, image_url)
	values('Startup Day Araripina: Alavancando empresas', 
	'2025-07-24 08:00:00', 
	'2025-08-24 08:00:00',
	'Evento presencial em Centro Tecnológico do Araripe, Araripina - PE',
	'https://images.sympla.com.br/65a2a1c371038-xs.png');

insert into events(title, date_start, date_end, description, image_url) 
	values('100 Mulheres ACATE: Mudando o mundo', 
	'2025-08-24 08:00:00', 
	'2025-09-24 08:00:00',
	'Evento presencial em ACATE - Associação Catarinense de Tecnologia, Florianópolis - SC',
	'https://images.sympla.com.br/67b896413b72a-xs.png');


insert into events(title, date_start, date_end, description, image_url) 
	values('Show Campo - Vitrine Tecnológica', 
	'2025-04-13 08:00:00', 
	'2025-04-13 22:00:00', 
	'Evento presencial em Paraí, Paraí - RS',
	'https://images.sympla.com.br/678ab777d0b5c-xs.png');


UPDATE events SET price = 29.90, is_paid = true WHERE id IN (1, 3, 5);

select * from events
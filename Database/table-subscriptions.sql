create EXTENSION IF NOT EXISTS "uuid-ossp";

create table subscriptions(
	id uuid primary key default uuid_generate_v4(),
	user_id int not null,
	event_id int not null,
	check_in varchar default 'pending',
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
	Unique(user_id, event_id)
)
	
insert into subscriptions(user_id, event_id) values (12, 1);
select * from subscriptions
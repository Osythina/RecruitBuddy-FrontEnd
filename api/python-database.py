import psycopg2
import random as r

connection = psycopg2.connect(
    dbname="####",
    user="postgres",
    password="####",
    host="####",
    port="####"
)
cursor = connection.cursor()

cursor.execute('DROP TABLE IF EXISTS ####')


create_script= '''CREATE TABLE IF NOT EXISTS options(
                        option_id    varchar(15),
                        color        varchar(15),
                        transmission varchar(10),
                        primary key (option_id))'''
cursor.execute(create_script)

#Populate table
insert_script= '''INSERT INTO options(option_id, color, transmission)
                  VALUES(%s, %s, %s)'''

#cursor.execute(insert_script,****,****,....)

#Populate model table

connection.commit()
cursor.close()
connection.close() 
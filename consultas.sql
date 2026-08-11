-- 1. Personas activas ordenadas por nombre

SELECT 
    id_persona, 
    nombre, 
    correo, 
    activo
FROM 
    Personas
WHERE 
    activo = 1
ORDER BY 
    nombre ASC;


-- 2. Listado de tickets con información de la persona

SELECT 
    T.id_ticket,
    P.nombre,
    P.correo,
    T.descripcion,
    T.estatus,
    T.fecha_registro
FROM 
    Tickets T
INNER JOIN 
    Personas P ON T.id_persona = P.id_persona;


-- 3. Conteo de tickets por persona 

SELECT 
    P.id_persona,
    P.nombre,
    COUNT(T.id_ticket) AS total_tickets
FROM 
    Personas P
LEFT JOIN 
    Tickets T ON P.id_persona = T.id_persona
GROUP BY 
    P.id_persona, 
    P.nombre
ORDER BY 
    total_tickets DESC;
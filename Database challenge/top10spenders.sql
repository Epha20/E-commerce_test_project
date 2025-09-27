SELECT
    u.username,
    u.email,
    SUM(o.total_amount) AS total_spent
FROM
    Users u
JOIN
    Orders o ON u.user_id = o.user_id
GROUP BY
    u.user_id
ORDER BY
    total_spent DESC
LIMIT 10;
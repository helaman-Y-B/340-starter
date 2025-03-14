-- 1 Insert tony stark account
INSERT INTO public.account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@n'
    );
-- 2 Updates the account_type column to "Admin" for Tony stark account
UPDATE public.account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony';
-- 3 Deletes the Tony Stark account
DELETE FROM public.account
WHERE account_id = 1;
-- 4 Modify the GM Hummer record
UPDATE public.inventory
SET inv_description = REPLACE(
        inv_description,
        'the small interiors',
        'a huge interior'
    )
WHERE inv_id = 10;
-- 5 Join inventory table and classsification table to show model fields and classsification name field where inventory items that are = "Sport"
SELECT inv_model, class_name
FROM inventory
JOIN classification
ON inventory.class_id = classification.class_id
WHERE inv_type = 'Sport';

-- 6 Updates all records in the inventory table to add "/vehicles" in the middle of the path in the inv_image and inv_thumbnail
UPDATE public.inventory
SET inv_image = REPLACE(
    inv_image,'/','/vehicles/'
), inv_thumbnail = REPLACE(
    inv_thumbnail,'/','/vehicles/'
);
WHERE inv_image NOT LIKE '%/vehicles%' AND inv_thumbnail LIKE '%/vehicles%';

-- Selects all data from the account table
SELECT *
FROM account;
-- Selects all data from the classification table
SELECT *
FROM classification;
-- Selects all data from the inventory table
SELECT *
FROM inventory; 
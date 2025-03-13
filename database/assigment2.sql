-- Insert tony stark account
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
-- Updates the account_type column to "Admin" for Tony stark account
UPDATE public.account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony';
-- Deletes the Tony Stark account
DELETE FROM public.account
WHERE account_id = 1;
-- Modify the GM Hummer record
UPDATE public.inventory
SET inv_description = REPLACE(
        inv_description,
        'the small interiors',
        'a huge interior'
    )
WHERE inv_id = 10;
-- Selects all data from the account table
SELECT *
FROM account;
-- Selects all data from the classification table
SELECT *
FROM classification;
-- Selects all data from the inventory table
SELECT *
FROM inventory;
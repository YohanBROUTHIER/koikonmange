BEGIN;

INSERT INTO "family"
  ("name")
  VALUES
  ('Viande'),
  ('Poisson'),
  ('Végétal'),
  ('Champignon'),
  ('Féculent'),
  ('Légume'),
  ('Fruit'),
  ('Fleur'),
  ('Céréal'),
  ('Légumineuse'),
  ('Laitage');

INSERT INTO "ingredient"
  ("name")
  VALUES
  ('Pomme'),
  ('Poire'),
  ('Pêche'),
  ('Abricot'),
  ('Poulet'),
  ('Boeuf'),
  ('lardon'),
  ('Lapin'),
  ('Saumon'),
  ('Lieu noir'),
  ('Sardine'),
  ('Riz'),
  ('Pate'),
  ('Pomme de terre'),
  ('Crème fraiche'),
  ('Pâte brisée'),
  ('Pâte feuilleté'),
  ('Pâte sablé');

INSERT INTO "ingredient_has_family"
  ("ingredient_id","family_id")
  VALUES
  (1,3),
  (1,7),
  (2,3),
  (2,7),
  (3,3),
  (3,7),
  (4,3),
  (4,7),
  (5,1),
  (6,1),
  (7,1),
  (8,1),
  (9,2),
  (10,2),
  (11,2),
  (12,5),
  (13,5),
  (14,5),
  (15,11);

INSERT INTO "recipe"
  ("name","steps","time","preparation_time")
  VALUES
  ('Tartiflette', '{
    "Eplucher les pommes de terre, les couper en dés, bien les rincer et les essuyer dans un torchon propre.",
    "Faire chauffer l huile dans une poêle, y faire fondre les oignons.",
    "Lorsque les oignons sont fondus, ajouter les pommes de terre et les faire dorer de tous les côtés.",
    "Lorsqu elles sont dorées, ajouter les lardons et finir de cuire. Éponger le surplus de gras avec une feuille de papier essuie-tout.",
    "D autre part, gratter la croûte du reblochon et le couper en deux (ou en quatre).",
    "Préchauffer le four à 200°C (thermostat 6-7) et préparer un plat à gratin en frottant le fond et les bords avec la gousse d ail épluchée.",
    "Dans le plat à gratin, étaler une couche de pommes de terre aux lardons, disposer dessus la moitié du reblochon, puis de nouveau des pommes de terre. Terminer avec le reste du reblochon (croûte vers les pommes de terre).",
    "Enfourner pour environ 20 minutes de cuisson."
  }','60 minutes', '15 minutes'),
  ('Boeuf Bourguignon', '{
    "Couper la viande en morceaux, émincer les oignons, couper les carottes en rondelles et hacher l''ail.",
    "Faire chauffer de l''huile dans une cocotte, y faire dorer la viande sur toutes ses faces.",
    "Ajouter les oignons, les carottes et l''ail. Laisser revenir quelques minutes.",
    "Verser le vin rouge et le bouillon de boeuf dans la cocotte. Ajouter le bouquet garni et assaisonner avec du sel et du poivre.",
    "Laisser mijoter à feu doux pendant environ 2 heures, en remuant de temps en temps.",
    "Pendant ce temps, faire revenir les champignons dans une poêle avec un peu de beurre jusqu''à ce qu''ils soient dorés.",
    "Ajouter les champignons dans la cocotte et poursuivre la cuisson pendant encore 30 minutes.",
    "Servir chaud, accompagné de pommes de terre vapeur ou de pâtes."
  }','150 minutes', '30 minutes'),
  ('Ratatouille', '{
    "Couper les légumes en dés (aubergine, courgette, poivrons, tomates).",
    "Faire chauffer de l''huile dans une grande poêle ou une cocotte, y faire revenir les oignons et l''ail émincés jusqu''à ce qu''ils soient dorés.",
    "Ajouter les dés de poivrons et laisser cuire quelques minutes.",
    "Ajouter les dés d''aubergine et de courgette. Laisser cuire jusqu''à ce que les légumes soient tendres.",
    "Incorporer les dés de tomates, le thym, le romarin et le laurier. Assaisonner avec du sel et du poivre.",
    "Laisser mijoter à feu doux pendant environ 30 à 40 minutes, en remuant de temps en temps.",
    "Rectifier l''assaisonnement si nécessaire et servir chaud."
  }','60 minutes', '20 minutes'),
  ('Poulet rôti aux herbes', '{
    "Préchauffer le four à 200°C (thermostat 6-7).",
    "Frotter le poulet avec un mélange d''herbes (thym, romarin, persil), d''ail émincé, de sel et de poivre.",
    "Déposer le poulet dans un plat allant au four, arroser d''un filet d''huile d''olive et ajouter un peu d''eau au fond du plat.",
    "Enfourner et laisser cuire pendant environ 1 heure 30, en arrosant régulièrement le poulet avec son jus."
  }','90 minutes', '10 minutes'),
  ('Pâtes à la carbonara', '{
    "Faire cuire les pâtes dans de l''eau bouillante salée selon les instructions sur l''emballage.",
    "Pendant ce temps, dans une poêle, faire revenir les lardons jusqu''à ce qu''ils soient dorés.",
    "Dans un bol, mélanger les jaunes d''œufs avec le parmesan râpé et du poivre.",
    "Une fois les pâtes cuites, les égoutter et les verser dans la poêle avec les lardons. Retirer du feu.",
    "Ajouter le mélange d''œufs et de fromage aux pâtes chaudes et mélanger rapidement jusqu''à ce que la sauce devienne crémeuse.",
    "Servir immédiatement avec un peu plus de parmesan râpé et du poivre fraîchement moulu."
  }','20 minutes', '10 minutes'),
  ('Salade César', '{
    "Préparer la vinaigrette en mélangeant la moutarde, l''ail écrasé, le vinaigre, le jus de citron, le sel et le poivre. Incorporer lentement l''huile d''olive en fouettant.",
    "Dans un grand bol, mélanger les feuilles de laitue romaine coupées en morceaux avec la vinaigrette.",
    "Ajouter les croûtons et le parmesan râpé. Bien mélanger.",
    "Griller les blancs de poulet assaisonnés de sel et de poivre dans une poêle jusqu''à ce qu''ils soient bien cuits.",
    "Trancher le poulet et disposer sur la salade.",
    "Servir immédiatement."
  }','20 minutes', '15 minutes'),
  ('Tiramisu', '{
    "Mélanger le mascarpone, les jaunes d''œufs et le sucre dans un grand bol jusqu''à obtenir une crème lisse et homogène.",
    "Dans un autre bol, battre les blancs d''œufs en neige ferme.",
    "Incorporer délicatement les blancs en neige à la crème de mascarpone à l''aide d''une spatule.",
    "Tremper rapidement les biscuits à la cuillère dans le café et les disposer au fond d''un plat.",
    "Recouvrir d''une couche de crème au mascarpone.",
    "Répéter l''opération pour former plusieurs couches.",
    "Saupoudrer de cacao en poudre sur le dessus.",
    "Réfrigérer pendant au moins 4 heures avant de servir."
  }','240 minutes', '20 minutes'),
  ('Pizza Margherita', '{
    "Préchauffer le four à 220°C (thermostat 7-8).",
    "Étaler la pâte à pizza sur une plaque de cuisson préalablement huilée.",
    "Étaler la sauce tomate sur la pâte.",
    "Disposer les tranches de mozzarella sur la sauce tomate.",
    "Placer les feuilles de basilic sur la mozzarella.",
    "Arroser d''un filet d''huile d''olive et assaisonner avec du sel et du poivre.",
    "Enfourner pendant environ 15 à 20 minutes, jusqu''à ce que la croûte soit dorée et croustillante.",
    "Retirer du four, découper en parts et servir chaud."
  }','30 minutes', '10 minutes'),
  ('Gâteau au chocolat', '{
    "Préchauffer le four à 180°C (thermostat 6).",
    "Faire fondre le chocolat cassé en morceaux au bain-marie ou au micro-ondes.",
    "Dans un bol, battre les œufs avec le sucre jusqu''à ce que le mélange blanchisse.",
    "Ajouter la farine et la levure tamisées, puis incorporer le chocolat fondu et le beurre fondu.",
    "Verser la pâte dans un moule beurré et fariné.",
    "Enfourner pendant environ 25 à 30 minutes, jusqu''à ce que le gâteau soit bien gonflé et qu''un cure-dent en ressorte propre.",
    "Laisser refroidir avant de démouler et de servir."
  }','40 minutes', '15 minutes'),
  ('Poulet au curry', '{
    "Faire chauffer de l''huile dans une grande poêle ou une cocotte.",
    "Ajouter les morceaux de poulet et les faire dorer de tous les côtés.",
    "Retirer le poulet de la poêle et réserver.",
    "Dans la même poêle, ajouter un peu plus d''huile si nécessaire et faire revenir les oignons, l''ail et le gingembre hachés jusqu''à ce qu''ils soient dorés et parfumés.",
    "Ajouter le curry en poudre, le cumin, le paprika et le piment de Cayenne. Bien mélanger.",
    "Verser le lait de coco et laisser mijoter pendant quelques minutes.",
    "Remettre le poulet dans la poêle et laisser cuire à feu doux pendant environ 20 minutes, jusqu''à ce que le poulet soit bien cuit et tendre.",
    "Servir chaud, accompagné de riz basmati."
  }','40 minutes', '15 minutes'),
  ('Quiche Lorraine', '{
    "Préchauffer le four à 180°C (thermostat 6).",
    "Étaler la pâte brisée dans un moule à tarte préalablement beurré et fariné.",
    "Piquer le fond de tarte avec une fourchette et le recouvrir de papier sulfurisé rempli de haricots secs.",
    "Cuire à blanc pendant environ 10 minutes.",
    "Pendant ce temps, dans un bol, battre les œufs avec la crème fraîche, le lait, le sel et le poivre.",
    "Ajouter les lardons dans la préparation.",
    "Retirer le papier sulfurisé et les haricots secs de la tartelette précuite.",
    "Verser la préparation aux œufs sur le fond de tarte.",
    "Enfourner et laisser cuire pendant environ 30 minutes, jusqu''à ce que la quiche soit dorée et prise.",
    "Laisser tiédir avant de servir."
  }','50 minutes', '15 minutes'),
  ('Salade niçoise', '{
    "Faire cuire les œufs dans une casserole d''eau bouillante pendant environ 10 minutes.",
    "Pendant ce temps, laver et préparer les légumes (tomates, poivrons, oignons, haricots verts, etc.).",
    "Dans un grand bol, disposer les feuilles de laitue, les tomates coupées en quartiers, les poivrons émincés, les oignons rouges émincés, les haricots verts cuits et les olives noires.",
    "Ajouter les filets de thon égouttés et les œufs durs coupés en quartiers.",
    "Assaisonner avec du sel, du poivre, du vinaigre et de l''huile d''olive.",
    "Mélanger délicatement et servir frais."
  }','20 minutes', '15 minutes'),
  ('Lasagnes', '{
    "Préchauffer le four à 180°C (thermostat 6).",
    "Dans une grande poêle, faire revenir l''oignon et l''ail hachés dans un peu d''huile d''olive.",
    "Ajouter la viande hachée et faire cuire jusqu''à ce qu''elle soit dorée.",
    "Incorporer la purée de tomates, le concentré de tomates, le bouillon de bœuf, l''origan, le basilic, le sel et le poivre. Laisser mijoter pendant environ 20 minutes.",
    "Pendant ce temps, préparer la béchamel en faisant fondre le beurre dans une casserole, ajouter la farine et cuire pendant quelques minutes.",
    "Incorporer le lait petit à petit en fouettant constamment jusqu''à ce que la sauce épaississe.",
    "Dans un plat à gratin, alterner les couches de sauce à la viande, de feuilles de lasagne et de béchamel, en terminant par une couche de béchamel.",
    "Saupoudrer de fromage râpé sur le dessus.",
    "Enfourner et cuire pendant environ 30 à 40 minutes, jusqu''à ce que le dessus soit doré et que les lasagnes soient bien cuites.",
    "Laisser reposer pendant quelques minutes avant de servir."
  }','90 minutes', '30 minutes'),
  ('Gazpacho', '{
    "Éplucher les tomates et les couper en gros morceaux.",
    "Éplucher le concombre et le poivron, les couper également en morceaux.",
    "Dans un blender, mixer les tomates, le concombre, le poivron, l''ail, le vinaigre, le sel, le poivre et l''huile d''olive jusqu''à obtenir une soupe lisse.",
    "Ajouter un peu d''eau si nécessaire pour obtenir la consistance désirée.",
    "Réfrigérer pendant au moins 2 heures avant de servir.",
    "Au moment de servir, garnir de dés de concombre, de poivron et de croûtons."
    }','130 minutes', '20 minutes');

INSERT INTO "user"
  ("name","email","password","active")
  VALUES
  ('Yohan B.', 'yohan.brouthier@oclock.school', '1234', TRUE);

INSERT INTO "history"
  ("user_id")
  VALUES
  (1),
  (1),
  (1),
  (1);

INSERT INTO "history_has_recipe"
  ("validate","history_id","recipe_id")
  VALUES
  (TRUE,1,1),
  (false,1,2),
  (false,1,3),
  (false,1,4),
  (false,2,1),
  (false,2,5),
  (false,2,6),
  (false,2,7),
  (false,2,8),
  (false,2,9),
  (false,2,10),
  (TRUE,3,1),
  (false,3,4),
  (false,3,5),
  (TRUE,4,1),
  (false,4,3),
  (false,4,7),
  (false,4,8);


COMMIT;
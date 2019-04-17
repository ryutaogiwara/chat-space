## users table

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false, unipue: true|
|mail_address|string|null: false, unique: true|

### Association
- belongs_to :group
- has_many   :messeges


## groups_users table

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## groups table

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false, unipue: true|

### Association
- has_many   :users


## messages table

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|body|string|null: false|
|image|string|null: false|
|user_id|integer|null: false|
|group_id|integer|null: false|


### Association
- belongs_to :user


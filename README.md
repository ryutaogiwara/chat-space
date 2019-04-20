## users table

|Column|Type|Options|
|------|----|-------|
|password|string|null: false|
|name|string|null: false, unipue: true|
|mail_address|string|null: false, unique: true|

### Association
- has_many   :groupes, through: members
- has_many   :messeges
  has_many :members


## menbers table

|Column|Type|Options|
|------|----|-------|
|user_id|reference|null:false, foreign_key: true|
|group_id|reference|null:false, foreign_key: true|
|message_id|reference|foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groups table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### Association
- has_many   :users
  has_many   :messages


## messages table

|Column|Type|Options|
|------|----|-------|
|body|string||
|image|string||
|user_id|reference|null:false, foreign_key: true|
|group_id|reference|null:false, foreign_key: true|


### Association
- belongs_to  :user
  belongs_to  :groups


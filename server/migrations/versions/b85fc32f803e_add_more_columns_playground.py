"""add more columns playground

Revision ID: b85fc32f803e
Revises: 0d14f08974d0
Create Date: 2023-06-28 10:12:07.180238

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b85fc32f803e'
down_revision = '0d14f08974d0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('playgrounds', schema=None) as batch_op:
        batch_op.add_column(sa.Column('neighborhood', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('has_restroom', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('has_water_feature', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('playgrounds', schema=None) as batch_op:
        batch_op.drop_column('has_water_feature')
        batch_op.drop_column('has_restroom')
        batch_op.drop_column('neighborhood')

    # ### end Alembic commands ###
"""initial schema

Revision ID: 0001
Revises:
Create Date: 2026-04-04
"""
from alembic import op
import sqlalchemy as sa

revision = '0001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # --- Enum types ---
    order_status = sa.Enum(
        'pending', 'paid', 'dispatched', 'delivered', 'cancelled', 'refunded',
        name='orderstatus',
    )
    enquiry_status = sa.Enum(
        'new', 'contacted', 'converted', 'closed',
        name='enquirystatus',
    )
    order_status.create(op.get_bind(), checkfirst=True)
    enquiry_status.create(op.get_bind(), checkfirst=True)

    # --- products ---
    op.create_table(
        'products',
        sa.Column('id',            sa.Integer, primary_key=True, index=True),
        sa.Column('name',          sa.String(200), nullable=False),
        sa.Column('slug',          sa.String(220), unique=True, nullable=False, index=True),
        sa.Column('category',      sa.String(80),  nullable=False),
        sa.Column('description',   sa.Text,        nullable=True),
        sa.Column('how_to_use',    sa.Text,        nullable=True),
        sa.Column('storage',       sa.Text,        nullable=True),
        sa.Column('allergens',     sa.Text,        nullable=True),
        sa.Column('image_url',     sa.String(500), nullable=True),
        sa.Column('image_back_url', sa.String(500), nullable=True),
        sa.Column('featured',      sa.Boolean,     nullable=False, server_default='false'),
        sa.Column('in_stock',      sa.Boolean,     nullable=False, server_default='true'),
        sa.Column('price',         sa.Integer,     nullable=False),
    )

    # --- product_variants ---
    op.create_table(
        'product_variants',
        sa.Column('id',         sa.Integer, primary_key=True, index=True),
        sa.Column('product_id', sa.Integer, sa.ForeignKey('products.id'), nullable=False),
        sa.Column('label',      sa.String(80),  nullable=False),
        sa.Column('price',      sa.Integer,     nullable=False),
        sa.Column('sku',        sa.String(80),  unique=True, nullable=True),
        sa.Column('in_stock',   sa.Boolean,     nullable=False, server_default='true'),
        sa.Column('sort_order', sa.Integer,     nullable=False, server_default='0'),
    )

    # --- orders ---
    op.create_table(
        'orders',
        sa.Column('id',                sa.Integer, primary_key=True, index=True),
        sa.Column('reference',         sa.String(20),  unique=True, nullable=False, index=True),
        sa.Column('order_token',       sa.String(36),  unique=True, nullable=False),
        sa.Column('status',            sa.Enum('pending', 'paid', 'dispatched', 'delivered',
                                               'cancelled', 'refunded', name='orderstatus'),
                  nullable=False, server_default='pending'),
        sa.Column('stripe_payment_id', sa.String(200), nullable=True),
        sa.Column('customer_name',     sa.String(200), nullable=False),
        sa.Column('customer_email',    sa.String(200), nullable=False),
        sa.Column('customer_phone',    sa.String(30),  nullable=True),
        sa.Column('address_line1',     sa.String(200), nullable=False),
        sa.Column('address_line2',     sa.String(200), nullable=True),
        sa.Column('city',              sa.String(100), nullable=False),
        sa.Column('postcode',          sa.String(10),  nullable=False),
        sa.Column('country',           sa.String(2),   nullable=False, server_default='GB'),
        sa.Column('subtotal',          sa.Integer,     nullable=False),
        sa.Column('shipping',          sa.Integer,     nullable=False, server_default='0'),
        sa.Column('total',             sa.Integer,     nullable=False),
        sa.Column('notes',             sa.Text,        nullable=True),
        sa.Column('created_at',        sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at',        sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    # --- order_items ---
    op.create_table(
        'order_items',
        sa.Column('id',            sa.Integer, primary_key=True),
        sa.Column('order_id',      sa.Integer, sa.ForeignKey('orders.id'),           nullable=False),
        sa.Column('product_id',    sa.Integer, sa.ForeignKey('products.id'),         nullable=False),
        sa.Column('variant_id',    sa.Integer, sa.ForeignKey('product_variants.id'), nullable=True),
        sa.Column('name',          sa.String(200), nullable=False),
        sa.Column('variant_label', sa.String(80),  nullable=True),
        sa.Column('quantity',      sa.Integer,     nullable=False),
        sa.Column('unit_price',    sa.Integer,     nullable=False),
    )

    # --- wholesale_enquiries ---
    op.create_table(
        'wholesale_enquiries',
        sa.Column('id',             sa.Integer, primary_key=True, index=True),
        sa.Column('business_name',  sa.String(200), nullable=False),
        sa.Column('business_type',  sa.String(100), nullable=False),
        sa.Column('postcode',       sa.String(10),  nullable=False),
        sa.Column('monthly_spend',  sa.String(50),  nullable=True),
        sa.Column('phone',          sa.String(30),  nullable=True),
        sa.Column('email',          sa.String(200), nullable=False),
        sa.Column('message',        sa.Text,        nullable=True),
        sa.Column('status',         sa.Enum('new', 'contacted', 'converted', 'closed',
                                            name='enquirystatus'),
                  nullable=False, server_default='new'),
        sa.Column('created_at',     sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    # --- newsletter_subscribers ---
    op.create_table(
        'newsletter_subscribers',
        sa.Column('id',            sa.Integer, primary_key=True),
        sa.Column('email',         sa.String(200), unique=True, nullable=False, index=True),
        sa.Column('active',        sa.Boolean,     nullable=False, server_default='true'),
        sa.Column('subscribed_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
    )


def downgrade() -> None:
    op.drop_table('newsletter_subscribers')
    op.drop_table('wholesale_enquiries')
    op.drop_table('order_items')
    op.drop_table('orders')
    op.drop_table('product_variants')
    op.drop_table('products')
    sa.Enum(name='enquirystatus').drop(op.get_bind(), checkfirst=True)
    sa.Enum(name='orderstatus').drop(op.get_bind(), checkfirst=True)

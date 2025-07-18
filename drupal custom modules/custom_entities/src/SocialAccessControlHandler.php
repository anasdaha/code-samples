<?php

namespace Drupal\custom_entities;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Defines the access control handler for the Social entity type.
 */
class SocialAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\custom_entities\Entity\SocialInterface $entity */

    // Admin permission bypasses all access checks.
    if ($account->hasPermission('administer social entities')) {
      return AccessResult::allowed()->cachePerPermissions();
    }

    switch ($operation) {
      case 'view':
        if (!$entity->isPublished()) {
          return AccessResult::allowedIfHasPermission($account, 'view unpublished social entities');
        }
        return AccessResult::allowedIfHasPermission($account, 'view published social entities');

      case 'update':
        if ($account->hasPermission('edit any social entities')) {
          return AccessResult::allowed();
        }
        if ($account->hasPermission('edit own social entities') && $account->id() === $entity->getOwnerId()) {
          return AccessResult::allowed();
        }
        return AccessResult::forbidden();

      case 'delete':
        if ($account->hasPermission('delete any social entities')) {
          return AccessResult::allowed();
        }
        if ($account->hasPermission('delete own social entities') && $account->id() === $entity->getOwnerId()) {
          return AccessResult::allowed();
        }
        return AccessResult::forbidden();
    }

    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'create social entities');
  }

}

<?php

namespace Drupal\custom_entities;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Defines the access control handler for the Resource entity type.
 */
class ResourceAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\custom_entities\Entity\ResourceInterface $entity */

    // Admin permission bypasses all access checks.
    if ($account->hasPermission('administer resource entities')) {
      return AccessResult::allowed()->cachePerPermissions();
    }

    switch ($operation) {
      case 'view':
        if (!$entity->isPublished()) {
          return AccessResult::allowedIfHasPermission($account, 'view unpublished resource entities');
        }
        return AccessResult::allowedIfHasPermission($account, 'view published resource entities');

      case 'update':
        return AccessResult::allowedIfHasPermissions($account, [
          'edit any resource entities',
          'edit own resource entities',
        ], 'OR');

      case 'delete':
        return AccessResult::allowedIfHasPermissions($account, [
          'delete any resource entities',
          'delete own resource entities',
        ], 'OR');

      default:
        // Unknown operation, no opinion.
        return AccessResult::neutral();
    }
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'create resource entities');
  }

}